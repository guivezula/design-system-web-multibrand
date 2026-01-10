import type { BaseInputProps } from "../base-input/base-input.types";

export declare class BaseInputTextProps extends BaseInputProps {
  protected label: string;
  protected placeholder: string;
  protected supportText: string;
  protected error: boolean;

  protected wrapperTemplate(content?: unknown): unknown;
  protected labelTemplate(content?: unknown): unknown;
  protected supportTextTemplate(content?: unknown): unknown;
}
