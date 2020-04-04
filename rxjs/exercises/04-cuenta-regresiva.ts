import { interval } from 'rxjs';
import { take, map } from 'rxjs/operators';

/**
 * Ejercicio: Realizar una cuenta regresiva
 * empezando de 7
 */

// Salida esperada ===
// 7
// 6
// 5
// 4
// 3
// 2
// 1
// 0

(() => {
  const inicio = 7;
  const countdown$ = interval(700).pipe(
    // Usar los operadores necesarios
    // para realizar la cuenta regresiva
    take(inicio + 1),
    map(it => inicio - it)
  );

  // No tocar esta línea ==================
  countdown$.subscribe(console.log); // =
  // ======================================
})();
