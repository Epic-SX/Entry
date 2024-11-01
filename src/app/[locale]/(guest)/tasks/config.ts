import * as z from "zod";

export const crateExamSchema = (indexs: number[]) => {
    const result = indexs
        .reduce((result, index) => ({
            ...result,
            [`task_${index + 1}`]: z.string().trim()
                .min(1, 'answer_required')
                .max(1000, 'answer_max'),
        }),
            {});
    return z.object(result);
}