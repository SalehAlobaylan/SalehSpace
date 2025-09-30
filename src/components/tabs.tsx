import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import PostsCarousel from './postsCarousel'
import Socials from './socials'
import MainText from './mainText'
import GithubCard from './githubCard/githubCard'

const tabs = [
  {
    name: 'Overview',
    value: 'overview',
    content: (
        <main className="flex flex-col gap-6 sm:gap-8 items-center w-full">

        <div className="w-full flex justify-center">
          <PostsCarousel />
        </div>
        <div className="w-full flex justify-center">
          <Socials />
        </div>
        <div className="w-full flex justify-center">
          <MainText />
        </div>
        <div className="w-full flex justify-center">
          <GithubCard />
        </div>
      </main>
    )
  },
  {
    name: 'Blogs',
    value: 'blogs',
    content: (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground text-center">
          📝 Blogs section coming but not soon :)
        </p>
      </div>
    )
  },
  {
    name: 'Posts',
    value: 'posts',
    content: (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground text-center">
          📱 Posts section coming but not soon :)
        </p>
      </div>
    )
  }
]

const TabsLiftedDemo = () => {
  return (
    <div className='w-full'>
      <Tabs defaultValue='overview' className='gap-4 w-full'>
        <div className='w-full border-b border-border'>
          <TabsList className='bg-background justify-start rounded-none border-0 p-0 w-auto h-auto'>
            {tabs.map(tab => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className='bg-background border-b-border dark:data-[state=active]:bg-background data-[state=active]:border-border data-[state=active]:border-b-background h-full rounded-none rounded-t border border-transparent data-[state=active]:-mb-px data-[state=active]:shadow-none dark:border-b-0 dark:data-[state=active]:-mb-px px-4 py-2'
              >
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {tabs.map(tab => (
          <TabsContent key={tab.value} value={tab.value} className='w-full'>
            <div className='w-full min-h-[400px]'>{tab.content}</div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export default TabsLiftedDemo

