// export const GameStore = signalStore(
//   { providedIn: 'root' },
//   withState({
//     board: [ /* массив 3х3 с данными о цветах кубов */ ],
//     history: [], // массив состояний для undo
//     moves: 0,
//     status: 'idle' as 'idle' | 'playing' | 'won'
//   }),
//   withMethods((store) => ({
//     moveCube(id: number, direction: 'up' | 'down' | 'left' | 'right') {
//       // Здесь простая логика:
//       // 1. Проверяем, можно ли сдвинуть (есть ли рядом пустое место).
//       // 2. Если да — обновляем board.
//       // 3. Вызываем функцию циклического сдвига цветов для этого куба.
//       // 4. Инкрементируем moves.
//     },
//     undo() { /* ... */ }
//   }))
// );