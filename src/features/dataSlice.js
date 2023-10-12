import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data : JSON.parse(localStorage.getItem('data')|| [{
        id: '666e3e54-b1e1-4bbd-82f3-828888a214f8',
        taskName: 'To do app',
        checked: false,
        checkList: [
          {name: 'Set Up Context', checked: false},
          {name: 'render components from data in context', checked: false},
          {name: 'convert percentages to work from data', checked: false},
          {name: 'Set up checked from data', checked: false},
          {name: 'hook it up properly', checked: false},
        ],
        complexity: 7,
        priority: 10,
        date: '2023-09-30',
        tags: ["shopping", "errands", "fitness", "health"],
        time: '12:00',
      },
      {
        id: "123e4567-e89b-12d3-a456-426614174000",
        taskName: "Grocery Shopping",
        checked: false,
        checkList: [
          {name: "Make a shopping list", checked: false},
          {name: "Visit the grocery store", checked: false},
          {name: "Buy fruits and vegetables", checked: false},
          {name: "Get milk and eggs", checked: false},
          {name: "Pay at the counter", checked: false}
        ],
        complexity: 5,
        priority: 7,
        date: "2023-10-30",
        tags: ["shopping", "errands"],
        time: "14:30"
      },
      {
        id: "a1b2c3d4-e5f6-4a9b-8c7d-1e2f3a4b5c6d7",
        taskName: "Exercise Routine",
        checked: false,
        checkList: [
          {name: "Warm-up exercises", checked: false},
          {name: "Cardio workout", checked: false},
          {name: "Strength training", checked: false},
          {name: "Cool down and stretching", checked: false}
        ],
        complexity: 8,
        priority: 9,
        date: "2023-10-01",
        tags: ["fitness", "health"],
        time: "07:00"
      },
      {
        id: "7c8d9e10-f11g-12h13-i14j-15k16l17m18n19",
        taskName: "Write Blog Post",
        checked: false,
        checkList: [
          {name: "Research topic", checked: false},
          {name: "Outline the post", checked: false},
          {name: "Write the content", checked: false},
          {name: "Edit and proofread", checked: false},
          {name: "Publish on website", checked: false}
        ],
        complexity: 6,
        priority: 8,
        date: "2023-09-16",
        tags: ["writing", "blogging", "errands"],
        time: "10:00"
      }
    ])
}

const updateState = ( value) => {
    window.localStorage.setItem('data', JSON.stringify(value));
  };


export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers : {
        addTodo: (state, action) => {
            state.data.push(action.payload);
            updateState(state.data);
        },
        updateTodo : (state, action) => {
            state.data.splice(state.data.findIndex((obj)=> obj.id === action.payload.id), 1, action.payload);
            updateState(state.data);
        },
        changeBoolean: (state, action) => {
            const newData = [...state.data]
        newData.forEach((obj) => {
            if (obj.id === action.payload) {
              obj.checked = !obj.checked;
            }
          });
          state.data = newData;
          updateState(state.data);
        },
        pushSubtask : (state, action) => {
          const newData = [...state.data];
          newData.forEach((obj) => {
            if (obj.taskName === action.payload.task) {
              obj.checkList.push(action.payload.obj);
            }
          });
          state.data = newData;
          updateState(state.data);
        },
        deleteTask : (state, action) => {
          state.data.splice(state.data.findIndex((obj)=> obj.id === action.payload.id), 1);
          updateState(state.data);
        },
        setFalse : (state, action) => {
          const newData = [...state.data];
          newData.forEach((obj)=> {
            if(obj.id === action.payload){
              obj.checkList.forEach((ob)=>
                ob.checked = false
              )
            }
          })
          state.data = newData;
          updateState(state.data);
        },
        setChecked : (state, action) => {
          const newData = [...state.data];
          console.log(action.payload);
          newData.forEach((obj) => {
            if (obj.taskName === action.payload.task) {
              obj.checkList[action.payload.index].checked = !action.payload.isChecked;
            }
          });
          state.data = newData;
          updateState(state.data);
        }
    }
})


export const {addTodo, updateTodo, changeBoolean, pushSubtask, deleteTask, setFalse, setChecked} = dataSlice.actions;

export default dataSlice.reducer