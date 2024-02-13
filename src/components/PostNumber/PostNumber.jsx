import { useState } from 'react';
import { Label, Modal, TextInput, Select } from 'flowbite-react';
import { useDispatch } from 'react-redux';
import { addNumber } from '../../../redux/actions';
import './PostNumber.css';
import { useNavigate } from 'react-router-dom';
import { lotteriesDictionary } from '../../../helpers/lotteriesDictionary';

// eslint-disable-next-line react/prop-types
function PostNumber({ open, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    number1: "",
    number2: "",
    number3: "",
    hr: "",
    page: "",
    nameLottery: "",
    imageUrl: "",
    day: ""
  });

  const handleInputChange = (field, value) => {
    if (field === 'nameLottery') {
      // Find the selected lottery in the dictionary
      const selectedLottery = lotteriesDictionary.find(
        (lottery) => lottery.name === value
        );
        
        // Update the imageUrl field with the selected lottery's imageUrl
        setFormData({
          ...formData,
          [field]: value,
          imageUrl: selectedLottery ? selectedLottery.imageUrl : '',
        });
      } else {
        setFormData({
          ...formData,
          [field]: value,
        });
      }
    };
    // console.log(formData);
  
  const handleSubmit = async () => {
    // console.log('Formulario enviado:', formData);
    await dispatch(addNumber(formData)).then(() => {
      navigate(`/home`);
    });
    onClose();
  };
  return (
    <>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh'  }}>
      <div style={{ maxHeight: '80vh', }}> 

      <Modal show={open} isopen={open.toString()} size="md" onClose={onClose} popup>
        <Modal.Header />
        <Modal.Body>
          <div
            className="space-y-6 mx-auto text-center h-full "
            // style={{ width: '20rem' }}
          >
            <h3 className="text-xl font-medium text-gray-900 dark:text-white sticky">
              Agregar número
            </h3>

            <div style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto',}}>
            {/*... Aquí estarían todos tus inputs...*/}

              <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center',}}>
                <img src={formData.imageUrl} alt="" />
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center',}}>
                <div className="mb-2 block">
                  <Label htmlFor="nameLottery" value="nameLottery" />
                </div>
                <Select
                  style={{
                    marginLeft: '0.5rem',
                    width: '200px',
                    height: '40px',
                    borderRadius: '10px',
                  }}
                  id="nameLottery"
                  value={formData.nameLottery}
                  onChange={(event) =>
                    handleInputChange('nameLottery', event.target.value)
                  }
                >
                  <option value=''>Elije una lotería</option>
                  {
                    lotteriesDictionary?.map((lottery) => (
                      <option key={lottery.name} value={lottery.name}>
                        {lottery.name}
                      </option>
                    ))
                  }

                </Select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center',}}>
                <div className="mb-2 block">
                  <Label htmlFor="hr" value="hr" />
                </div>
                <Select
                  style={{
                    marginLeft: '0.5rem',
                    width: '200px',
                    height: '40px',
                    borderRadius: '10px',
                  }}
                  id="hr"
                  value={formData.hr}
                  onChange={(event) =>
                    handleInputChange('hr', event.target.value)
                  }
                >
                    <option value=''>Elije el horario</option>
                    {lotteriesDictionary
                      .filter((lottery) => lottery.name === formData.nameLottery)
                      .map((lottery) => (
                        // Map over the hr array of the selected lottery to generate options
                        lottery.hr.map((hr) => (
                          <option key={hr} value={hr}>
                            {hr}
                          </option>
                        ))
                      ))}

                </Select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center',}}>
                <div className="block">
                  <Label htmlFor="day" value="Day" />
                </div>
                <TextInput
                  style={{
                    paddingLeft: '0.5rem',
                    marginLeft: '0.5rem',
                    width: '200px',
                    height: '40px',
                    borderRadius: '10px',
                  }}
                  required
                  id="day"
                  type='date'
                  value={formData.day}
                  onChange={(event) =>
                    handleInputChange('day', event.target.value)
                  }
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center',}}>
                <div className="block">
                  <Label htmlFor="number1" value="number1" />
                </div>
                <TextInput
                  style={{
                    paddingLeft: '0.5rem',
                    marginLeft: '0.5rem',
                    width: '200px',
                    height: '40px',
                    borderRadius: '10px',
                  }}
                  id="number1"
                  type="number"
                  value={formData.number1}
                  onChange={(event) =>
                    handleInputChange('number1', event.target.value)
                  }
                  required
                  min='0'
                  max='100'
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center',}}>
                <div className="block">
                  <Label htmlFor="number2" value="number2" />
                </div>
                <TextInput
                  style={{
                    paddingLeft: '0.5rem',
                    marginLeft: '0.5rem',
                    width: '200px',
                    height: '40px',
                    borderRadius: '10px',
                  }}
                  id="number2"
                  type="number"
                  value={formData.number2}
                  onChange={(event) =>
                    handleInputChange('number2', event.target.value)
                  }
                  required
                  min='0'
                  max='100'
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center',}}>
                <div className="block">
                  <Label htmlFor="number3" value="number3" />
                </div>
                <TextInput
                  style={{
                    paddingLeft: '0.5rem',
                    marginLeft: '0.5rem',
                    width: '200px',
                    height: '40px',
                    borderRadius: '10px',
                  }}
                  id="number3"
                  type="number"
                  value={formData.number3}
                  onChange={(event) =>
                    handleInputChange('number3', event.target.value)
                  }
                  required
                  min='0'
                  max='100'
                />
              </div>

                <br />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  alignItems: 'center',
                  color: 'black',
                }}
              >
                <button className="botonAct" onClick={handleSubmit}
                  disabled={!formData.day}
                
                >
                  <span className="transition"></span>
                  <span className="gradient"></span>
                  <span className="label">Agregar</span>
                </button>
                  <br />
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
          </div>
          </div>
    </>
  );
}

export default PostNumber;