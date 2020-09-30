import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import SideDrawer from './components/SideDrawer';
import MainView from './components/MainView';
import { getManager } from './services/manager';
import AddUserModal from './components/AddUserModal';
import CreatePollModal from './components/CreatePollModal';
import { IState, MainListContext } from './models/state';

interface ICState {
  listContext: MainListContext;
}

const mapState = (state: IState): ICState => ({
  listContext: state.mainList.context,
});

function App({ listContext }: ICState): JSX.Element {
  useEffect(() => {
    getManager().getMainViewService().navigateMenu(listContext)();
  }, []);

  return (
    <div className="app-container">
      <SideDrawer />
      <MainView />
      <AddUserModal />
      <CreatePollModal />
    </div>
  );
}

export default connect(mapState)(App);
