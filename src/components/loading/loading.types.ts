import { BaseLoading } from "@mixins/base-loading";
import { LitElement } from "lit";

export type LoadingProps = Partial<HTMLDivElement>;

export const LoadingMixin = BaseLoading(LitElement);
