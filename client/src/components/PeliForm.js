import React, { useState, useEffect } from "react";
import { createPeli, getPeli, updatePeli } from "../services/peli-services";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function PeliForm() {

    const [errors, setErrors] = useState([]);
    const [peli, setPeli] = useState({
        name: '',
        country: '',
        director: '',
        year: '',
        
    });
    const { id } = useParams();
    const navigate = useNavigate();

    const getOnePeli = async () => {
        try {
            const peliFromService = await getPeli(id);
            setPeli({ ...peliFromService.data.peli});
        } catch(err) {
            console.log("Errorr", err);
        }
    }

    useEffect(() => {
        console.log("Peli", peli)
        id && getOnePeli();
    }, [id])

    useEffect(() => {
        console.log("Peli", peli)

    }, [peli])

    const addPeli = async (values) => {
        const createPeliInService = !id ? await createPeli(values) : await updatePeli(id, values);
            if (createPeliInService.data.message ==="" || createPeliInService.data.message ===" ") {
                alert("Se ha creado la pelicula")
                navigate("/");               
                }else {
                    const errorResponse = createPeliInService.data.errors;
                    const errorArr = [];
                for (const llave of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[llave].message);
                }
                setErrors(errorArr);
                }        
    }

    const peliSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, "El nombre de la pelicula no puede tener menos de 2 caracteres")
            .required("Este campo es obligatorio"),

        country: Yup.string()
            .required("Este campo es obligatorio"),

        director: Yup.string()
            .max(20, "El nombre del director no puede superar los 20 caracteres")
            .required("Este campo es obligatorio"),

        year: Yup.number()
            .required("Este campo es obligatorio")

         });



  return (
    <div className="form-login">
        {errors?.map((error, index) => <p key={index}>{error}</p>)}
            <Formik
                enableReinitialize
                initialValues={peli}
                validationSchema={peliSchema}
                onSubmit={(values) => addPeli(values)}
            >
                {({ errors, touched }) => (
                    <Form className="form-group">
                        <div>
                            <label htmlFor='name' className="col-form-label">Nombre de la pelicula </label>
                            <Field type='text' name='name' className={`form-control`} />
                            {errors.name && touched.name ? <p>{errors.name}</p> : null}
                        </div>

                        <div>
                            <label htmlFor='country' className="col-form-label">Pais </label>
                            <Field type='text' name='country' className={`form-control`} />
                            {errors.country && touched.country ? <p>{errors.country}</p> : null}
                        </div>

                        <div>
                            <label htmlFor='director' className="col-form-label">Director </label>
                            <Field type='text' name='director' className={`form-control`}/>
                            {errors.director && touched.director ? <p>{errors.director}</p> : null}
                        </div>


                        <div>
                            <label htmlFor='year' className="col-form-label">Año</label>
                            <Field type='number' name='year' className={`form-control`} />
                            {errors.year && touched.year ? <p>{errors.year}</p> : null}
                        </div>


                        <div>
                            <button type='submit' disabled={Object.values(errors).length>0 || Object.values(touched).length===0}>Agregar</button>
                        </div>


                    </Form>
                )}

            </Formik>
        </div>
)
}

export default PeliForm