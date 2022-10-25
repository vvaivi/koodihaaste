import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Button } from '.'
import { createBattle } from '../reducers/battle';

const Battle = () => {
  const dispatch = useDispatch();

  //Pitää olla omat metodit näiden lisäämiseen 
  const onStart = async () => {
    

  };

  return (
    <div>
      <h2>Battle</h2>
      <div>
        
        <Button onClick={onStart}> Start battle </Button>
      </div>
    </div>
  );
};

export default Battle;