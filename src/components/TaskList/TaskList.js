// Импортируем хук
// import { useSelector } from 'react-redux';
// import { Task } from 'components/Task/Task';
// // Импортируем объект значений фильтра
// import { statusFilters } from '../../redux/constants';

// const getVisibleTasks = (tasks, statusFilter) => {
//   switch (statusFilter) {
//     case statusFilters.active:
//       return tasks.filter(task => !task.completed);
//     case statusFilters.completed:
//       return tasks.filter(task => task.completed);
//     default:
//       return tasks;
//   }
// };

// export const TaskList = () => {
//   // Получаем массив задач из состояния Redux
//   const tasks = useSelector(state => state.tasks);
//   // Получаем значение фильтра из состояния Redux
//   const statusFilter = useSelector(state => state.filters.status);
//   // Вычисляем массив задач которые необходимо отображать в интерфейсе
//   const visibleTasks = getVisibleTasks(tasks, statusFilter);

//   return (
//     <ul>
//       {visibleTasks.map(task => (
//         <li key={task.id}>
//           <Task task={task} />
//         </li>
//       ))}
//     </ul>
//   );
// };
