export class ErrorMessageService{

    getErrorMessage(field: string, error: string): string {
        const messages: any = {
            'title': {
                'required': 'El titulo es obligatorio'
            },
            'description': {
                'required': 'La descripción es obligatoria'
            },
            'priority': {
                'required': 'La prioridad es obligatoria'
            }
        };
        return messages[field] ? messages[field][error] || 'Valor invalido' : 'Valor invalido';
    }
}