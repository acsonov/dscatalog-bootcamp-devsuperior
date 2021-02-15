import { makeRequest } from 'core/utils/resquest';
import React, { useState } from 'react';
import BaseForm from '../../BaseForm';
import './styles.scss';

type FormState = {
    name: string;
    price: string;
    category: string;
    description: string;
}

type formEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;

const Form = () => {
    const [formData, setFormData] = useState<FormState>({
        name: '',
        price: '',
        category: '',
        description: ''
    });

    const handleOnChange = (event: formEvent) => {
        const name = event.target.name;
        const value = event.target.value;

        setFormData(data => ({ ...data, [name]: value }));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload = {
            ...formData,
            imgUrl: 'https://images7.kabum.com.br/produtos/fotos/115737/console-sony-playstation-5-midia-fisica_1598984720_g.jpg',
            categories: [{ id: formData.category }]
        }
        makeRequest({ url: '/products', method: 'POST', data: payload })
            .then(() => {
                setFormData({ name: '', category: '', price: '', description: '' });
            })
        console.log(payload);
    }
    return (
        <form onSubmit={handleSubmit}>
            <BaseForm title="CADASTRAR UM PRODUTO">
                <div className="row">
                    <div className="col-6">
                        <input
                            value={formData.name}
                            name="name"
                            type="text"
                            className="form-control mb-5"
                            onChange={handleOnChange}
                            placeholder="nome do produto"
                        />
                        <select
                            value={formData.category}
                            className="form-control mb-5" onChange={handleOnChange}
                            name="category"
                        >
                            <option value="1">LIVROS</option>
                            <option value="2">ELETRONICOS</option>
                            <option value="3">COMPUTADORES</option>

                        </select>
                        <input
                            value={formData.price}
                            name="price"
                            type="text"
                            className="form-control mb-5"
                            onChange={handleOnChange}
                            placeholder="Preço"
                        />
                    </div>
                    <div className = "col-6">
                    <textarea
                        name="description"
                        value = {formData.description}
                        onChange={handleOnChange}
                        className = "form-control"
                        cols={30}
                        rows={10}
                    />
                    </div>
                </div>
            </BaseForm>
        </form>
    )
};

export default Form;