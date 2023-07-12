import { useState, useEffect } from 'react';
//owm library from contentful platform
import { createClient } from 'contentful';

//keys can be found when created a new project
const client = createClient({
  space: import.meta.env.VITE_SPACE,
  environment: 'master',
  accessToken: import.meta.env.VITE_ACCESS,
});

export const useFetchProjects = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  const getData = async () => {
    try {
      //inserts name of the project: 'projects'
      const response = await client.getEntries({ content_type: 'projects' });
      //loops through response.items in order to obtain all data necessary
      const projects = response.items.map((item) => {
        const { title, url, image } = item.fields;
        const id = item.sys.id;
        //in case there isn't any img it won't throw an error
        const img = image?.fields?.file?.url;

        return { title, url, id, img };
      });
      setProjects(projects);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { loading, projects };
};
