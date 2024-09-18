export function formatDate(date: Date | string, format: string = 'YYYY-MM-DD'): string {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    };

    if (format === 'YYYY-MM-DD') {
        return new Intl.DateTimeFormat('pt-BR', options).format(new Date(date));
    }

    // Adapte conforme necessário para outros formatos
    return new Date(date).toLocaleDateString();
}
