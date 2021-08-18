/* eslint-disable arrow-body-style */
import React, { useCallback, useState } from 'react';
import ActorGrid from '../components/actor/ActorGrid';
import CustomRadio from '../components/CustomRadio';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import { apiGet } from '../misc/config';
import { useLastQuery } from '../misc/custom-hooks';
import {
  RadioInputsWrapper,
  SearchButtonWrapper,
  SearchInput,
} from './Home.styled';

 const renderResults = (results) => {
   if (results && results.length === 0) {
     return <div>No results</div>;
   }
   if (results && results.length > 0) {
     return results[0].show ? (
       <ShowGrid data={results} />
     ) : (
       <ActorGrid data={results} />
     );
   }

   return null;
 };

const Home = () => {
  const [input, setInput] = useLastQuery();
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');
  const isShowSearch = searchOption === 'shows';

  const onSearch = () => {
    apiGet(`/search/${searchOption}?q=${input}`).then(result => {
      setResults(result);
    });
  };
  const onInputChange = useCallback(ev => {
    setInput(ev.target.value);
  },[setInput]);

  const onKeyDown = ev => {
    if (ev.keyCode === 13 && input.length > 0) {
      onSearch();
    }
  };

  const onRadioChange = useCallback(ev => {
    setSearchOption(ev.target.value);
  }, []);



  return (
    <MainPageLayout>
      <SearchInput
        type="text"
        placeholder="Search for Something"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      <RadioInputsWrapper>
        <div>
          <CustomRadio
            label="shows"
            id="shows-search"
            value="shows"
            checked={isShowSearch}
            onChange={onRadioChange}
          />
        </div>
        <div>
          <CustomRadio
            label="Actors"
            id="actors-search"
            value="people"
            checked={!isShowSearch}
            onChange={onRadioChange}
          />
        </div>
      </RadioInputsWrapper>

      <SearchButtonWrapper>
        <button type="submit" onClick={onSearch}>
          Search
        </button>
        {renderResults(results)}
      </SearchButtonWrapper>
    </MainPageLayout>
  );
};

export default Home;
