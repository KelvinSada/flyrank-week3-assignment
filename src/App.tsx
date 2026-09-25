import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RootLayout } from './components/layout/RootLayout'
import { HelpPage } from './pages/HelpPage'
import { HealthPage } from './pages/HealthPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { OverviewPage } from './pages/OverviewPage'
import { PlaceholderPage } from './pages/PlaceholderPage'
import { routes } from './routes'

function App() {
  return (
    <BrowserRouter>
      <RootLayout>
        <Routes>
          <Route path="/" element={<OverviewPage />} />
          {routes
            .filter((route) => route.path !== '/' && route.path !== '/health')
            .map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<PlaceholderPage route={route} />}
              />
            ))}
          <Route path="/help" element={<HelpPage />} />
          <Route path="/health" element={<HealthPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </RootLayout>
    </BrowserRouter>
  )
}

export default App
