import { useTheme, Text, Switch } from '@nextui-org/react';
import { useTheme as useNextTheme } from 'next-themes';

const HomePage = () => {
  const { theme, isDark, type } = useTheme();
  const { setTheme } = useNextTheme();
  return (
    <div>
      <Text
        css={{
          color: theme?.colors.primary.value,
        }}
      >
        I'm the home page!
      </Text>
      <div>
        <Text>The current theme is: {type}</Text>
        <Switch
          checked={isDark}
          onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
        />
      </div>
    </div>
  );
};

export default HomePage;
