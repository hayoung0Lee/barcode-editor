import styles from "./App.module.css";
import Editor from "./components/Editor";
import SideBar from "./components/SideBar";
import { useState } from "react";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import { LabelProvider } from "./utils/LabelContext";

function App() {
  const [selectedPath, onUpdateSelectedPath] = useState<any>([]);

  return (
    <LabelProvider>
      <div className={styles.app}>
        <div className={styles.main}>
          <div className={styles.leftMenu}>
            <Menu selectedPath={selectedPath} />
            <Editor
              path={[]}
              selectedPath={selectedPath}
              onUpdateSelectedPath={onUpdateSelectedPath}
            />
          </div>
          <SideBar selectedPath={selectedPath} />
        </div>
        <Footer />
      </div>
    </LabelProvider>
  );
}

export default App;
