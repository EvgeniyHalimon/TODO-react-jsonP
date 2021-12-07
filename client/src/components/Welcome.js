import React from 'react';
import {Figure} from 'react-bootstrap'

export default function Welcome(){
    return(
        <Figure
            style={{display : 'block', backgroundColor : '#0F1015'}}
        >
            <Figure.Image
                style={{display : 'block', margin: '0 auto'}}
                alt="picture"
                src="https://img5.goodfon.ru/wallpaper/nbig/f/2e/neon-neon-welcome.jpg"
            />
        </Figure>
    )
}