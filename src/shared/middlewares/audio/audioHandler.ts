import * as formidable from "formidable";

import {
  CustomIncomingMessage,
  CustomServerResponse,
} from "../../types/httpType";
import supabase from "../../../connect/supabase";
import env from "../../config/config";
import CustomError from "../../utils/customError";
import * as fs from "fs";
import { sendErrorResponse } from "../../helpers/responseError";

export interface AudioMiddlewareProps {
  req: CustomIncomingMessage;
  res: CustomServerResponse;
  next: () => void;
}

export async function audioHandler({ req, res, next }: AudioMiddlewareProps) {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err: any, fields: any, files: any) => {
    try {
      if (err) {
        throw new Error("Error ao processar formulario");
      }

      const audioChunk = files.audioChunk0;
      const contentType = Array.isArray(fields.contentType)
        ? fields.contentType[0]
        : fields.contentType;
      const contactId = Array.isArray(fields.contactId)
        ? fields.contactId[0]
        : fields.contactId;
      const fileData = fs.readFileSync(audioChunk[0].filepath);

      const response = await supabase.storage
        .from(`audio-messages`)
        .upload(`${Date.now()}--${audioChunk[0].newFilename}`, fileData, {
          contentType: audioChunk[0].mimetype,
        });

      if (response.error) {
        throw new CustomError("Erro ao carregar para o Supabase Storage", 500);
      }

      const baseUrl = `${env.supabaseUrl}/storage/v1/object/public/audio-messages`;
      const fileUrl = `${baseUrl}/${response.data.path}`;

      const newBody = {
        contentType,
        contactId,
      };

      req.audioUrl = fileUrl;
      req.body = newBody;
      next();
    } catch (err) {
      return sendErrorResponse(res, err);
    }
  });
}
