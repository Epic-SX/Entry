import { config } from "@/constants";

export const tourFormConfigs = config['tour_form'] as any;
export const steps = ['input', 'confirm', 'complete'];
export const MAX_STEP = steps.length;
export const MIN_STEP = 1;