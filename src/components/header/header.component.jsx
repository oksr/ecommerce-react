import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils'
import CartIcon from '../cart-icon/cart-icon.component'
import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect';

import { ReactComponent as Logo } from '../../assets/logo.svg'
import './header.styles.scss';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import {selectCartHidden} from '../../redux/cart/cart.selectors';
import {selectCurrentUser} from  '../../redux/user/user.selector';


const Header = ({ currentUser, hidden }) => (
    <div className='header'>
        <Link to='/'>
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>
                Shop
            </Link>
            <Link className='option' to='/shop'>
                Contact
            </Link>
            {
                currentUser ? (
                    <div className='option' onClick={() => auth.signOut()}>Sign Out</div>
                ) : (
                        <Link className='option' to='/signin'>Sign In</Link>
                    )
            }
            <CartIcon />
        </div>
        {
            hidden ? null :
            <CartDropdown/>
        }
    </div>
);

const mapStateProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStateProps)(Header);
