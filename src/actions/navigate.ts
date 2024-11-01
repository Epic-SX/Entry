'use server';

import { redirect } from "next/navigation";
/**
 * 
 * @param {string} path
 */
const navigate = async (path: string) => {
   redirect(path);
}

export default navigate;