import { NextFunction, Request, Response } from "express";
import { ControllerFunctions, ExpressFunction } from "../types/controller";

export function tryRunFunction(fn: ExpressFunction): ExpressFunction {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      return await fn(req, res, next);
    } catch (e) {
      next(e);
    }
  };
}

export function withHandleError(apiFunctions: { [key: string]: ExpressFunction }) {
  const functionsWithErrorHandler: ControllerFunctions = {};
  Object.keys(apiFunctions).forEach((nameFn) => {
    functionsWithErrorHandler[nameFn] = tryRunFunction(apiFunctions[nameFn]);
  });

  return functionsWithErrorHandler;
}