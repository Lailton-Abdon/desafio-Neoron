interface FormErrors {
    [key: string]: string;
}

export function validateForm(values: Record<string, any>): FormErrors {
    const errors: FormErrors = {};

    if (!values.codigo) {
        errors.codigo = 'O código é obrigatório.';
    }
    if (!values.origem) {
        errors.origem = 'A origem é obrigatória.';
    }
    if (!values.destino) {
        errors.destino = 'O destino é obrigatório.';
    }
    if (!values.data) {
        errors.data = 'A data é obrigatória.';
    }

    return errors;
}
