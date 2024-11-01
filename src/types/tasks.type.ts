export type TExamEntry = {
    id: number;
    status: number;
    task_answer: Array<TTaskAnswer>;
    photo1: string | null;
    photo2: string | null;
}
export type TTaskAnswer = {
    answer: string;
    exam_entry_id: number;
    id: number;
    task_id: number;
    task: TTask;
    question:string;
}
export type TTask = {
    answer_flg:number;
    id:number;
    question:string;
    question_jp:string;
    question_zh:string;
}
export type TTaskResponse = {
    exam_entry: TExamEntry;
    tmp_answers: Record<string, string>;
}