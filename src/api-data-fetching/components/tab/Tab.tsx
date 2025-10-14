import useGetActiveTab from "../../hooks/useGetActiveTab";
import { Link } from "react-router";
import "./Tab.css";

export interface ITabProps {
  name: string;
  path: string;
  value: string;
}

const LocalTab = ({
  tabs,
  tabName,
  setTabName,
}: {
  tabs: ITabProps[];
  tabName?: string;
  setTabName?: (name: string) => void;
}) => {
  let { tab } = useGetActiveTab({ tabName });
  if (!tab) {
    tab = "quotes";
  }
  const handleSetTabName = (name: string) => {
    if (setTabName) {
      setTabName(name);
    } else {
      return null;
    }
  };
  return (
    <div className="tab-container">
      <ul className="tab-list">
        {tabs.map(({ name, path, value }) => {
          return (
            <li className="tab-item" key={path}>
              <Link
                to={path}
                onClick={() => handleSetTabName(name)}
                className={value === tab ? "isSelected" : ""}
              >
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LocalTab;
