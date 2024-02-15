import React from "react";
import "./Footer.css";

function Footer() {
    return (
        <>
            <footer>
                <div class="footer">
                    <div class="row">
                        <a href={'//www.github.com/DevanshYadav9323/ToDo'} target="_blank"><i class="fa fa-code"></i></a>
                        <a href={'//www.github.com/DevanshYadav9323'} target="_blank"><i class="fa fa-github"></i></a>
                        <a href={'//www.linkedin.com/in/devanshyadav9323'} target="_blank"><i class="fa fa-linkedin"></i></a>
                        <a href={'mailto:devanshyadav9323@gmail.com'} target="_blank" rel="noopener noreferrer"><i class="fa fa-envelope-o"></i></a>
                        <a href="#"><i class="fa fa-arrow-up"></i></a>
                    </div>

                    <div class="row">
                        <ul>
                            <li><a href={'//www.github.com/DevanshYadav9323/ToDo'} target="_blank">Source Code</a></li>
                            <li><a href={'//www.github.com/DevanshYadav9323'} target="_blank">Github</a></li>
                            <li><a href={'//www.linkedin.com/in/devanshyadav9323'} target="_blank">Linkedin</a></li>
                            <li><a href={'mailto:devanshyadav9323@gmail.com'} target="_blank" rel="noopener noreferrer">Email</a></li>
                            <li><a href="#">Scroll To Top</a></li>
                        </ul>
                    </div>

                    <div class="row">
                        ToDo App Copyright © 2024 - All rights reserved || Designed and Developed By: Devansh Yadav
                    </div>
                </div>
            </footer>

        </>
    );
}

export default Footer;