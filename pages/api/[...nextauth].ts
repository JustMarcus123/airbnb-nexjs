import {PrismaAdapter } from '@next-auth/prisma-adapter';
import  NextAuth , { AuthOptions } from 'next-auth';
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

import prisma from "@/libs/prismadb";




export const authOptions: AuthOptions ={
    adapter:PrismaAdapter(prisma),
    providers:[
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID as string,
            clientSecret: process.env.FACEBOOK_SECRET as string,
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),

        CredentialsProvider({
            name:'credentials',
            credentials:{
                email:{label:'email', type:'text'},
                password:{label:'password', type:'password'},
            },
            async authorize(credentials){
                if(!credentials?.email || !credentials?.password){
                    throw new Error ('invalid credentials');
                }

                const user = await prisma.user.findUnique({
                    where:{
                        email:credentials.email
                    }
                });

                console.log (user)

                if(!user || !user?.hashPassword){
                    throw new Error ('invalid credentials');
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashPassword
                );

                if(!isCorrectPassword){
                    throw new Error('invalid credentials')
                }

                
                return user;

            }
        })
    ],
    pages:{
        signIn:'/',
    },

    debug:process.env.NODE_ENV === 'development',

    session:{
        strategy:"jwt"

    },

    secret:process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions)