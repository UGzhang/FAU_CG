using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Random = UnityEngine.Random;

public class MoveCoin : MonoBehaviour
{
    // seconds
    private float _destroyInterval = 20f;
    private WaitForSeconds _waitForSeconds;

    private float _rotateSpeed;
    private float _moveSpeed;

    private float _maxHeight = 5f;
    private float _minHeight = 2f;
    
    private void Start()
    {
        _rotateSpeed = Random.Range(20, 30);
        _moveSpeed = Random.Range(2, 5);
        _waitForSeconds = new WaitForSeconds(_destroyInterval);
        StartCoroutine(DestroySelf());
    }

    private IEnumerator DestroySelf()
    {
        yield return _waitForSeconds;
        DoDestroy();
    }

    private void DoDestroy()
    {
        Destroy(gameObject);
    }

    private void OnTriggerEnter(Collider other)
    {
        if (other.tag.Equals("Player"))
        {
            DoDestroy();
            other.transform.localScale += new Vector3(0.1f, 0.1f, 0.1f);
        }
    }

    private void FixedUpdate()
    {
        transform.localEulerAngles += new Vector3(0f, _rotateSpeed * Time.fixedDeltaTime, 0f);
        
        if (transform.localPosition.y >= _maxHeight || transform.localPosition.y <= _minHeight)
        {
            _moveSpeed *= -1;
        }
        
        transform.localPosition += new Vector3(0f, _moveSpeed * Time.fixedDeltaTime, 0f);
    }

    private void OnDestroy()
    {
        StopCoroutine(DestroySelf());
    }
}
