const getAll = async () => {
    try {
        const res = await fetch('https://galenika.cloud/api/pharmacyFiles', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`
            }
        });

        const data = await res.json();
        return data.data;
    } catch (error) {
        console.log('error', error);
    }
};

const download = async (id, data) => {
    console.log('data', data)
    // try {
    //     const res = await fetch(`https://galenika.cloud/api/downloadPharmacyFile/${id}`, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${window.localStorage.getItem('token')}`
    //         }
    //     });
    // } catch (error) {
    //     console.log('error', error)
    // }
    fetch(`https://galenika.cloud/api/downloadPharmacyFile/${id}`)
  .then(response => response.blob())
  .then(blob => {
    // Create a URL for the blob object
    const url = window.URL.createObjectURL(new Blob([blob]));

    // Create a link element
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', data.fileName); // Set desired file name

    // Trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up
    link.parentNode.removeChild(link);
  })
  .catch(error => {
    // Handle any errors
    console.error('Error downloading the file:', error);
  });
}

export default {
    getAll,
    download
}