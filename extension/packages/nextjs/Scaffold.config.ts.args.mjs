 useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
