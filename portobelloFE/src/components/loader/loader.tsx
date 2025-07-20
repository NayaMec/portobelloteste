import { ReactPortal } from '../reactPortal';
import { Spinner } from '../spinner/spinner';
import './loader.scss';

export function Loader({ isLoading }: { isLoading: boolean }) {
  if (!isLoading) return null;

  return (
    <ReactPortal containerId="loader-root">
      <div id="loader-root">
        <div className="overlay" id="loader">
          <Spinner size={90} />
        </div>
      </div>
    </ReactPortal>
  );
}
