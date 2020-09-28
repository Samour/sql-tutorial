import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import SideDrawer from './components/SideDrawer';
import MainView from './components/MainView';
import { mainViewService } from './services/MainViewService';
import { store } from './store';
import AddUserModal from './components/AddUserModal';
import CreatePollModal from './components/CreatePollModal';

function App(): JSX.Element {
  useEffect(() => {
    mainViewService.navigateMenu(store.getState().mainList.context)();
  }, []);

  return (
    <Provider store={store}>
      <div className="app-container">
        <SideDrawer />
        <MainView />
        <AddUserModal />
        <CreatePollModal />
      </div>
    </Provider>
  );
}

export default App;
