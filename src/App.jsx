import { useState } from 'react';
import { FileUploader } from './components/FileUploader/FileUploader';
import { Result } from './components/Result/Result';
import { parseGraphFromText } from './components/utils/graphParser';
import { checkIsomorphismVF, checkIsomorphismVF2 } from './components/utils/algorithms';
import styles from './App.module.css';

const App = () => {
  const [graph1, setGraph1] = useState(null);
  const [graph2, setGraph2] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGraph1Upload = (content) => {
    const parsedGraph = parseGraphFromText(content);
    setGraph1(parsedGraph);
  };

  const handleGraph2Upload = (content) => {
    const parsedGraph = parseGraphFromText(content);
    setGraph2(parsedGraph);
  };

  const runAlgorithm = async (algorithmType) => {
    if (!graph1 || !graph2) {
      alert('Please upload both graphs first');
      return;
    }

    setLoading(true);

    // Wrap in setTimeout to allow UI to update
    setTimeout(() => {
      const isIsomorphic = algorithmType === 'VF' 
        ? checkIsomorphismVF(graph1, graph2)
        : checkIsomorphismVF2(graph1, graph2);

      setResult({
        algorithm: algorithmType,
        isIsomorphic
      });
      setLoading(false);
    }, 0);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Graph Isomorphism Checker</h1>
        
        <div className={styles.uploaderContainer}>
          <div className={styles.uploaderWrapper}>
            <h2 className={styles.subtitle}>Graph 1</h2>
            <FileUploader 
              onFileContent={handleGraph1Upload} 
              isUploaded={!!graph1}
            />
          </div>
          <div className={styles.uploaderWrapper}>
            <h2 className={styles.subtitle}>Graph 2</h2>
            <FileUploader 
              onFileContent={handleGraph2Upload}
              isUploaded={!!graph2}
            />
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button
            onClick={() => runAlgorithm('VF')}
            className={`${styles.button} ${styles.buttonVF}`}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Run VF Algorithm'}
          </button>
          <button
            onClick={() => runAlgorithm('VF2')}
            className={`${styles.button} ${styles.buttonVF2}`}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Run VF2 Algorithm'}
          </button>
        </div>

        {result && <Result result={result} />}
      </div>
    </div>
  );
};

export default App;
