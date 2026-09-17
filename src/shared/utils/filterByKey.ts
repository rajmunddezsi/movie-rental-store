export default function filterByKey<T>(
    searchText: string[] = [], 
    data: T[],
    searchKey: (keyof T)[]
): T[] {
    return data.filter((dataRow) => {
        return searchText.every((text, index) => {
            if (text) {
                if (isNaN(+text)) {
                    return (dataRow[searchKey[index]] as string).toLowerCase().includes(text.toLowerCase());
                }

                return (dataRow[searchKey[index]] as number[]).includes(+text);
            }

            return true;
        })
    })
}