"use client";

import axios from 'axios';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import toast from 'react-hot-toast';
import Button from '../Button';
import {FcGoogle }from 'react-icons/fc'
import { AiFillApple, AiFillFacebook } from 'react-icons/ai';

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post('/api/register', data)
            .then(() => {
                registerModal.onClose();
            })
            .catch((error) => {
               toast.error('something went wrong')
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const bodyContent =(
         <div className="flex flex-col gap-4">
         <Heading title='Welcome to Airbnb'
          subtitle='Please Create an account'
        //   center
          />
        <Input 
        id='email'
        label='Email'
        disable={isLoading}
        register={register}
        errors={errors}
        required
        />
         <Input 
        id='name'
        label='name'
        disable={isLoading}
        register={register}
        errors={errors}
        required
        />
         <Input 
        id='password'
        label='password'
        disable={isLoading}
        register={register}
        errors={errors}
        required
        />
        </div>
    )

    const footerContent =(
        <div className='
        flex
        flex-col
        gap-4
        mt-3'>
            <hr />
            <Button
            outline
            label='Continue with google'
            icon={FcGoogle}
            onClick={()=>{}}
            />
             <Button
            outline
            label='Continue with facebook'
            icon={AiFillFacebook}
            onClick={()=>{}}
            />
            <div className='justify-center flex flex-row items-center gap-2'>
                <div>
                Already Have an Account?
                </div>
                <div className='text-neutral-800
                cursor-pointer
                hover:underline'
                onClick={registerModal.onClose}>
                    Log in
                </div>
            </div>
        </div>
    )
    

    return (
            
            <Modal disable={isLoading}
             isOpen={registerModal.isOpen}
             title="Register"
             actionLabel='Continue'
             onClose={registerModal.onClose}
             onSubmit={handleSubmit(onSubmit)}
             body={bodyContent}
             footer={footerContent}
             />
           
     
    );
};

export default RegisterModal;
