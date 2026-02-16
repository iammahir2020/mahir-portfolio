import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { Box, RefreshCcw } from "lucide-react";

export const GravityToggle = () => {
  const [isActive, setIsActive] = useState(false);
  const [elements, setElements] = useState<{ el: HTMLElement; body: Matter.Body }[]>([]);
  // Fix: changed type to number | undefined to match requestAnimationFrame return type
  const requestRef = useRef<number>(null); 
  const engine = useRef(Matter.Engine.create());

  const toggleGravity = () => {
    if (!isActive) {
      const { Bodies, Composite, Mouse, MouseConstraint } = Matter;
      const newElements: { el: HTMLElement; body: Matter.Body }[] = [];

      const targets = document.querySelectorAll('.gravity-item');
      const SCALE_FACTOR = 0.5; 

      targets.forEach((el) => {
        const htmlEl = el as HTMLElement;
        const rect = htmlEl.getBoundingClientRect();

        const body = Bodies.rectangle(
          rect.left + rect.width / 2,
          rect.top + rect.height / 2,
          rect.width * SCALE_FACTOR,
          rect.height * SCALE_FACTOR,
          { 
            restitution: 0.5, 
            friction: 0.1,
            label: 'item' // Helpful for identifying bodies
          }
        );

        htmlEl.style.position = 'fixed';
        htmlEl.style.top = '0px';
        htmlEl.style.left = '0px';
        htmlEl.style.width = `${rect.width}px`;
        htmlEl.style.height = `${rect.height}px`;
        htmlEl.style.zIndex = '9999';
        htmlEl.style.margin = '0';
        htmlEl.style.transformOrigin = 'center center';
        htmlEl.style.pointerEvents = 'none'; // CRITICAL: Allows mouse to click 'through' to the physics engine
        htmlEl.style.willChange = 'transform';

        newElements.push({ el: htmlEl, body });
      });

      // Boundaries
      const ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 50, window.innerWidth, 100, { isStatic: true });
      const leftWall = Bodies.rectangle(-50, window.innerHeight / 2, 100, window.innerHeight, { isStatic: true });
      const rightWall = Bodies.rectangle(window.innerWidth + 50, window.innerHeight / 2, 100, window.innerHeight, { isStatic: true });

      // FIX: Mouse Constraint needs to be aware of the element handling the clicks
      const mouse = Mouse.create(document.body);
      
      const mouseConstraint = MouseConstraint.create(engine.current, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: { visible: false }
        }
      });

      // Keep the mouse in sync with scrolling (though we hide overflow)
      mouse.element.removeEventListener("mousewheel", (mouse as any).mousewheel);
      mouse.element.removeEventListener("DOMMouseScroll", (mouse as any).mousewheel);

      Composite.add(engine.current.world, [ground, leftWall, rightWall, mouseConstraint, ...newElements.map(e => e.body)]);
      setElements(newElements);
      setIsActive(true);
      document.body.style.overflow = 'hidden';
    } else {
      window.location.reload(); 
    }
  };

  useEffect(() => {
    if (!isActive) return;

    const update = () => {
      Matter.Engine.update(engine.current, 1000 / 60);
      
      elements.forEach(({ el, body }) => {
        const { x, y } = body.position;
        const angle = body.angle;
        // Apply the same 0.5 scale here to match the physics body size
        el.style.transform = `translate3d(${x - el.offsetWidth / 2}px, ${y - el.offsetHeight / 2}px, 0) rotate(${angle}rad) scale(0.5)`;
      });

      requestRef.current = requestAnimationFrame(update);
    };

    requestRef.current = requestAnimationFrame(update);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isActive, elements]);

  return (
    <button 
      onClick={toggleGravity}
      className={`fixed bottom-24 left-6 z-[10001] p-4 rounded-full border shadow-2xl transition-all duration-300
        ${isActive ? "bg-red-500 text-white" : "bg-white dark:bg-slate-900 text-slate-500 hover:scale-110"}`}
    >
      {isActive ? <RefreshCcw size={24} /> : <Box size={24} />}
    </button>
  );
};