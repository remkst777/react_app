import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/FormFields/Button';

const ProfileView = ({ showChangePasswordModal, logout, loadingLogout }) => (
  <div className="my-5">
    <Button size="lg" className="col-12 my-2" name="Cart" />
    <Button
      size="lg"
      onClick={showChangePasswordModal}
      className="col-12 my-2"
      name="Change password"
    />
    <Button
      disabled={loadingLogout}
      size="lg"
      onClick={logout}
      className="col-12 my-2"
      name="Logout"
    />
  </div>
);

ProfileView.propTypes = {
  showChangePasswordModal: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  loadingLogout: PropTypes.bool.isRequired,
};

export default ProfileView;