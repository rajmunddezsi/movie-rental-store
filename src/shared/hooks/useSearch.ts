export function useSearch<T>(
    searchText: string = '', 
    data: T[],
    searchKey: keyof T
): T[] {

    return data.filter(
    (dataRow: T) => {
        const value = dataRow[searchKey];

        if (typeof value !== 'string') return false;

        return value.toLowerCase().includes(searchText.toLowerCase());
    });
}