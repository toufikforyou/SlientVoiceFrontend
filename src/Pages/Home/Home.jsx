import AllPost from '../AllPost/AllPost';

const Home = () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    return (
        <div>
            <AllPost/>
        </div>
        
    );
};

export default Home;
