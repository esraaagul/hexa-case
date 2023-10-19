import { useState, useEffect } from 'react';
import { GetFolderOrDocData, GetRootFolder } from "../Services/GetDataFolder";
import { FilePdfOutlined,FileWordOutlined,FolderOpenOutlined,FileUnknownOutlined } from '@ant-design/icons';
import { Tree, Spin } from 'antd';
const { DirectoryTree } = Tree;


const FilePage = () => {
    const [treeData, setTreeData] = useState([]);
    const [spining, setSpining] = useState(false);

    const updateTreeData = (list, key, children) =>
        list.map((node) => {
            if (node.key === key) {
                return {
                    ...node,
                    children,
                };
            }
            if (node.children) {
                return {
                    ...node,
                    children: updateTreeData(node.children, key, children),
                };
            }
            return node;
        });

    const getExtensionByIcon = (extension) => {
        switch(extension) {
            case "pdf" :
                return <FilePdfOutlined style={{color: "red"}}/>;
            case "docx" :
                return <FileWordOutlined style={{color: "blue"}} />;    
            case "folder" :
                return <FolderOpenOutlined style={{color: "#7E7E7E"}}/>;
            default : 
                return <FileUnknownOutlined style={{color: "red"}}/>;        
        }
       
    }  

    const convertTreeData = (child) => {
        let data = { title: child.name, key: child.id, icon :  getExtensionByIcon(child.extension)  };
        
        if (!child.isFolder) {
            data.isLeaf = true;
        }

        return data;
    }

    const onLoadData = ({ key, children }) =>
        new Promise(async (resolve) => {
            if (children) {
                resolve();
                return;
            }
            let loadTreeData = [];

            await GetFolderOrDocData(key).then(resp => {
                resp.childs.map(child => {
                    loadTreeData.push(convertTreeData(child))
                });
            });

            setTimeout(() => {
                setTreeData((origin) =>
                    updateTreeData(origin, key, loadTreeData),
                );

                resolve();
            }, 1000);
        });

    const getTreeData = async () => {
        setSpining(true);
        setTreeData([]);

        GetRootFolder().then(resp => {
            resp.childs.map(child => {
                console.log("child",child)
                setTreeData(items =>
                    [...items, convertTreeData(child)]
                );
            });

        });

        setSpining(false);
    }

    useEffect(() => {
        getTreeData();
    }, [])

    return (
        <Spin className='spin-load' tip={"Loading Data"} spinning={spining}>
            <DirectoryTree style={{ marginTop: 5 }} loadData={onLoadData} treeData={treeData} />
        </Spin>);
};

export default FilePage;