import React, { useState } from 'react';
import {
    Navbar,
    NavbarBrand,
    Collapse,
    Nav,
    NavLink,
    NavItem,
    NavbarToggler
} from 'reactstrap';
import '../asset/components/nav-bar.scss'

const AscendaNavBar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="ascenda-nav-bar">
            <Navbar color="light" light expand="md">
                <NavbarBrand data-testid='navbar-brand' href="/home-page">{props.title}</NavbarBrand>
                <NavbarToggler data-testid='navbar-toggle' onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="#">About</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
                {props.customItems}
            </Navbar>
        </div >
    );
}

export default AscendaNavBar