'use client';
import Link from 'next/link';
import { useState, useRef, type FormEvent } from 'react';
import { findState, STATES } from '@/data/states';
import { choosePuzzle, newRound, play, type PlayablePuzzle } from '@/lib/clue-ladder/play';
export function ClueLadderGame({puzzles}: {puzzles: PlayablePuzzle[]}) {
 const [index, setIndex] = useState<number | null>(null);
 const [round, setRound] = useState(newRound);
 const [input, setInput] = useState('');
 const [message, setMessage] = useState('');
 const inputRef = useRef<HTMLInputElement>(null);
 const puzzle = index === null ? null : puzzles[index];
 const finished = round.status !== 'playing';
 function start() {
  setIndex(choosePuzzle(puzzles.length, index, Math.random()));
  setRound(newRound()); setInput(''); setMessage('');
  window.setTimeout(() => inputRef.current?.focus(), 0);
 }
 function submit(event: FormEvent) {
  event.preventDefault();
  if (!puzzle || finished) return;
  const state = findState(input);
  if (!state) { setMessage('Enter a U.S. state name or its two-letter abbreviation.'); return; }
  if (round.guesses.includes(state.code)) { setMessage('You already tried ' + state.name + '. Try another state.'); return; }
  const next = play(puzzle, round, state.code);
  setRound(next); setInput('');
  setMessage(next.status === 'won' ? 'Correct!' : state.name + ' is not the answer.' + (next.status === 'playing' ? ' Here is your next clue.' : ''));
  inputRef.current?.focus();
 }
 const button = 'rounded-xl bg-[var(--forest)] px-5 py-3 font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-4 disabled:opacity-50';
 return <main className="min-h-screen px-4 pb-12 sm:px-6">
  <div aria-hidden="true" className="topographic-lines" />
  <div className="relative mx-auto max-w-3xl">
   <header className="flex items-center justify-between border-b border-[var(--line)] py-5">
    <Link href="/" className="font-display text-xl font-black tracking-tight">GEOTRAIL</Link>
    <nav aria-label="Game modes" className="flex gap-4 text-sm font-bold"><Link href="/">Border Hunt</Link><Link href="/clue-ladder/" aria-current="page" className="text-[var(--trail-dark)]">Clue Ladder</Link></nav>
   </header>
   <section className="py-8 sm:py-12">
    <p className="eyebrow">Clue Ladder · U.S. States</p>
    <h1 className="mt-4 font-display text-5xl font-black tracking-tight sm:text-6xl">Seven clues.<br/><span className="text-[var(--trail-dark)]">One mystery state.</span></h1>
    <p className="mt-5 max-w-xl leading-7 text-[var(--ink-soft)]">Guess early to score more. A wrong guess or a skip reveals the next clue. You have one guess per clue.</p>
   </section>
   {!puzzle ? <section className="rounded-3xl border border-[var(--line)] bg-white/70 p-7 shadow-sm">
    <h2 className="text-xl font-bold">Try the first three states</h2>
    <p className="mt-3 mb-6 leading-7">A small practice collection while we fine-tune the clues. Play again to try a different mystery state.</p>
    <button className={button} onClick={start}>Start Clue Ladder</button>
    <noscript>Enable JavaScript to play Clue Ladder.</noscript>
   </section> : <>
    <div className="mb-4 flex flex-wrap items-center justify-between gap-2 font-bold">
     <span>Clue {round.rung + 1} of {puzzle.clues.length}</span>
     <span>{finished ? 'Score: ' + round.score : Math.max(0, puzzle.maxByRung[round.rung] - round.guesses.length * puzzle.wrongGuessPenalty) + ' points available'}</span>
    </div>
    <div className="mb-6 flex gap-2" aria-hidden="true">{puzzle.clues.map((_, i) => <span key={i} className={'h-2 flex-1 rounded-full ' + (i <= round.rung ? 'bg-[var(--forest)]' : 'bg-[var(--line)]')}/>)}</div>
    <section className="rounded-3xl border border-[var(--line)] bg-white/80 p-6 shadow-sm sm:p-8" aria-label="Current clue">
     <p className="text-2xl leading-relaxed font-bold">{puzzle.clues[round.rung].text}</p>
     {puzzle.clues[round.rung].image && /* Audited inline SVG; no image optimization or network request needed. */
      // eslint-disable-next-line @next/next/no-img-element
      <img src={puzzle.clues[round.rung].image} alt={finished ? puzzle.name + ' shape' : 'Mystery state shape'} className="mx-auto mt-5 h-56 w-full object-contain"/>}
    </section>
    <p role="status" aria-live="polite" className="my-4 min-h-6 font-semibold">{message}</p>
    {finished ? <section className="rounded-2xl bg-[var(--mist)] p-6" aria-label="Result">
     <h2 className="text-2xl font-black">{round.status === 'won' ? 'You found ' : 'The answer was '}{puzzle.name}.</h2>
     <p className="my-3">{round.status === 'won' ? 'Solved on clue ' + (round.rung+1) + '. ' : 'All seven clues revealed. '}Score: {round.score}</p>
     <button className={button} onClick={start}>Play another state</button>
    </section> : <form onSubmit={submit}>
     <label htmlFor="ladder-guess" className="mb-2 block font-bold">Which state is it?</label>
     <div className="flex flex-col gap-3 sm:flex-row"><input ref={inputRef} id="ladder-guess" list="ladder-states" value={input} onChange={e => setInput(e.target.value)} autoComplete="off" placeholder="State name or abbreviation" className="min-w-0 flex-1 rounded-xl border border-[var(--forest)] bg-white p-3"/><button className={button} type="submit">Guess state</button></div>
     <datalist id="ladder-states">{STATES.map(s => <option key={s.code} value={s.name}/>)}</datalist>
     <button type="button" className="mt-4 rounded-lg px-1 py-3 font-bold underline underline-offset-4" onClick={() => {setRound(play(puzzle, round)); setInput(''); setMessage(round.rung === 6 ? 'No guesses left.' : 'Next clue revealed.'); inputRef.current?.focus();}}>{round.rung === 6 ? 'Reveal answer' : 'Skip to next clue'}</button>
    </form>}
    {round.rung > 0 && <details className="mt-6 rounded-xl border border-[var(--line)] p-4"><summary className="cursor-pointer font-bold">Earlier clues ({round.rung})</summary><ol className="mt-4 list-decimal space-y-3 pl-5">{puzzle.clues.slice(0, round.rung).map((c, i) => <li key={i}>{c.text}</li>)}</ol></details>}
    {round.guesses.length > 0 && <p className="mt-5 text-sm">Your guesses: {round.guesses.map(code => findState(code)!.name).join(' · ')}</p>}
   </>}
   <footer className="mt-10 border-t border-[var(--line)] pt-5 text-sm leading-6 text-[var(--ink-soft)]">Practice preview · Three researched states · 1,000 starting points; each new clue reduces the maximum by 100, and each wrong guess costs another 50.</footer>
  </div>
 </main>;
}
