export default {
    name: 'category',
    title: 'Categoría del Menú',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Nombre de la Categoría (Ej. Entradas)',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'id',
            title: 'ID para la web',
            type: 'slug',
            options: { source: 'name', maxLength: 96 },
            validation: Rule => Rule.required()
        },
        {
            name: 'items',
            title: 'Platos de esta categoría',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'name', title: 'Nombre del Plato', type: 'string', validation: Rule => Rule.required() },
                        { name: 'description', title: 'Descripción (Opcional)', type: 'text' },
                        { name: 'price', title: 'Precio (Solo números)', type: 'number', validation: Rule => Rule.required() },
                        // AQUÍ ESTÁ EL CAMPO DE LA IMAGEN QUE FALTABA
                        {
                            name: 'image',
                            title: 'Foto del Plato',
                            type: 'image',
                            options: { hotspot: true }
                        }
                    ]
                }
            ]
        }
    ]
}