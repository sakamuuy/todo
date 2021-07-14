import styled from 'styled-components';
import Header from './components/Header';
import TagList from './components/TagList';
import Schedule from './components/Schedule';

import { DragDropContext } from 'react-beautiful-dnd';

const App = () => {
  return (
    <div style={{height: '100%'}}>
      <Header />
      <DragDropContext onDragEnd={() => console.log('end')}>
        <Schedule></Schedule>
        <TagList></TagList>
      </DragDropContext>
    </div>
  );
}

export default App;
