"use client"

import {  FieldError, FieldValues, UseFormRegister } from "react-hook-form";
import { BiRupee } from "react-icons/bi";

interface InputProps{
    id: string;
    label: string;
    type?:string;
    disable?:boolean;
    formatePrice?:boolean;
    required?:boolean;
    register:UseFormRegister<FieldValues>,
    errors:FieldError
}


const Input:React.FC<InputProps> = ({
    id,
    label,
    type="text",
    disable,
    formatePrice,
    register,
    required,
    errors
}) => {
    return (
        <div className="w-full relative">
            {formatePrice &&(
               < BiRupee
               size={24}
               className="
               text-neutral-700
               absolute
               top-5
               left-2"/>
            )}
            <input 
            id={id}
            disabled={disable}
            {...register(id,{required})}
            placeholder=" "
            type={type}
            className={`
            peer
            w-full
            p-4
            pt-6
            font-light
            bg-white
            border-2
            rounder-md
            outline-none
            transition
            disable:opacity-70
            disable:cursor-not-allowed
            ${formatePrice ? 'pl-9' : 'pl-4'}
            ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
            ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}

            `}
            />
        </div>
    );
}

export default Input;