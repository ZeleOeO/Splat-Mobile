export const convertDueDate = (date: string): Date => new Date(date.replace(" ", "T"));
export const getNoOfDays = (date: Date): any => {
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}


