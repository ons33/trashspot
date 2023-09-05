import React from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { createPopper } from '@popperjs/core';
import {
  DeleteProfile,
  GetProfile,
  BanProfile
} from '../../../../redux/actions/profileActions';
import { useDispatch } from 'react-redux';

const NotificationDropdown = (user) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const DeleteHandler = (id) => {
    dispatch(DeleteProfile(id));
  };

  const ShowHandler = (id) => {
    dispatch(GetProfile(id));
    console.log('id li hachti bih' , id)
    navigate('/admin/profile/' + id);
  };

  const BanHandler = (id) => {
    
    dispatch(BanProfile(user.user._id, 1));
    console.log('user to ban', user.user)
  }

  console.log('user', user.user._id);
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: 'left-start',
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <>
      <a
        className="text-blueGray-500 py-1 px-3"
        href="#"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <i className="fas fa-ellipsis-v"></i>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? 'block ' : 'hidden ') +
          'bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48'
        }
      >
        <a
          href="#"
          className={
            'text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700'
          }
          onClick={() => ShowHandler(user.user._id)}
        >
          Show
        </a>

        <a
          href="#"
          className={
            'text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700'
          }
          onClick={() => DeleteHandler(user.user._id)}
        >
          Delete
        </a>
        <a
          href="#"
          className={
            'text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700'
          }
          onClick={() => BanHandler(user.user._id)}
        >
          Ban
        </a>
      </div>
    </>
  );
};

export default NotificationDropdown;
