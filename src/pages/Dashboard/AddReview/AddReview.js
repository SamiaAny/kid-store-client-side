import { Button, Typography } from '@mui/material';
import React from 'react';
import { useForm } from "react-hook-form";
import useAuth from '../../../hooks/useAuth';
import './AddReview.css';


const AddReview = () => {
    const { user } = useAuth();
    // const [loading,setLoading] = useState(false);
    const { register, handleSubmit,reset, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data);
        fetch('https://nameless-basin-78356.herokuapp.com/review',{
            method: 'POST',
            headers: {
                'content-type':'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
        .then(result => {
            // console.log(result);
            if(result.insertedId) {
                alert('Add review successfully');
                reset();
            }
        })
    }
    return (
        <div>
            <Typography variant="h5" component="div" sx={{mb:2}}>
                Add Review
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} className="review-form">
                
                <input defaultValue={user?.displayName} {...register("name")} /><br />
                
                <input defaultValue={user?.email} type="email" {...register("email", { required: true })} /><br />
                {errors.exampleRequired && <span>This field is required</span>}
                
                <textarea placeholder="Add your review here..." {...register("comment", { required: true })} /><br />

                <label>Give rating (between 0 & 5): </label>
                <input id="rating" type="number" {...register("ratings", { required: true })} min="0" max="5"/><br />
                {errors.exampleRequired && <span>This field is required</span>}

                {/* <input type="submit" /> */}
                <Button type="submit" sx={{ m: 2 }} color="secondary" variant="outlined">Submit your review</Button>
            </form>
        </div>
    );
};

export default AddReview;