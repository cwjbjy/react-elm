import Header from '@/components/header/index.jsx'
const Home = ()=>{
    const leftConfig = {
        type:'search',
        value:'/login'
    }
    const rightConfig = {
        type:'user',
        value:'/login'
    }
    return(
        <div>
            <Header left={leftConfig} title='请选择地址...' right={rightConfig}/>
        </div>
    )
}

export default Home